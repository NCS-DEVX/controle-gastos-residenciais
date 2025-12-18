using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transacao>> ListarAsync()
        {
            return await _context.Transacoes
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Transacao> CriarAsync(Transacao transacao)
        {
            if (transacao == null)
                throw new ArgumentNullException(nameof(transacao));

            // Validações básicas (formato/consistência).
            if (string.IsNullOrWhiteSpace(transacao.Descricao))
                throw new ArgumentException("A descrição da transação é obrigatória.");

            if (transacao.Valor <= 0)
                throw new ArgumentException("O valor da transação deve ser maior que zero.");

            if (!Enum.IsDefined(typeof(TipoTransacao), transacao.Tipo))
                throw new ArgumentException("Tipo de transação inválido.");

            var pessoa = await _context.Pessoas
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == transacao.PessoaId);

            if (pessoa == null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            var categoria = await _context.Categorias
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == transacao.CategoriaId);

            if (categoria == null)
                throw new KeyNotFoundException("Categoria não encontrada.");

            // Regra: menor de idade (idade < 18) não pode registrar receita.
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
                throw new InvalidOperationException("Pessoa menor de idade não pode registrar receitas.");

            // Regra: categoria deve ser compatível com o tipo da transação.
            if (CategoriaIncompativel(categoria.Finalidade, transacao.Tipo))
                throw new InvalidOperationException("Categoria incompatível com o tipo da transação.");

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return transacao;
        }

        private static bool CategoriaIncompativel(FinalidadeCategoria finalidade, TipoTransacao tipo)
        {
            return (finalidade == FinalidadeCategoria.Receita && tipo == TipoTransacao.Despesa) ||
                   (finalidade == FinalidadeCategoria.Despesa && tipo == TipoTransacao.Receita);
        }
    }
}