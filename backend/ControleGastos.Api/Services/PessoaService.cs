using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class PessoaService
    {
        private readonly AppDbContext _context;

        public PessoaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Pessoa>> ListarAsync()
        {
            return await _context.Pessoas
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Pessoa> CriarAsync(Pessoa pessoa)
        {
            if (pessoa == null)
                throw new ArgumentNullException(nameof(pessoa));

            if (pessoa.Idade < 0)
                throw new ArgumentException("Idade inválida.");

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return pessoa;
        }

        public async Task RemoverAsync(int pessoaId)
        {
            var pessoa = await _context.Pessoas.FindAsync(pessoaId);

            if (pessoa == null)
                throw new KeyNotFoundException("Pessoa não encontrada.");

            // O banco está configurado com Cascade: ao remover Pessoa, remove Transações associadas.
            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
        }
    }
}
