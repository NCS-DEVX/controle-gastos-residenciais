using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class RelatorioService
    {
        private readonly AppDbContext _context;

        public RelatorioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(
            List<RelatorioPessoaDto> Pessoas,
            decimal TotalReceitas,
            decimal TotalDespesas,
            decimal SaldoGeral
        )> ObterTotaisPorPessoaAsync()
        {
            var pessoas = await _context.Pessoas
                .AsNoTracking()
                .ToListAsync();

            // SQLite não suporta SUM(decimal) via SQL; materialização garante compatibilidade.
            var transacoes = await _context.Transacoes
                .AsNoTracking()
                .ToListAsync();

            var totaisPorPessoaId = transacoes
                .GroupBy(t => t.PessoaId)
                .ToDictionary(
                    g => g.Key,
                    g =>
                    {
                        var receitas = g.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                        var despesas = g.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);
                        return (Receitas: receitas, Despesas: despesas);
                    });

            var resultado = new List<RelatorioPessoaDto>(pessoas.Count);

            foreach (var pessoa in pessoas)
            {
                var (receitas, despesas) = totaisPorPessoaId.TryGetValue(pessoa.Id, out var totais)
                    ? totais
                    : (0m, 0m);

                resultado.Add(new RelatorioPessoaDto
                {
                    PessoaId = pessoa.Id,
                    NomePessoa = pessoa.Nome,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas
                });
            }

            var totalReceitas = resultado.Sum(r => r.TotalReceitas);
            var totalDespesas = resultado.Sum(r => r.TotalDespesas);

            return (
                resultado,
                totalReceitas,
                totalDespesas,
                totalReceitas - totalDespesas
            );
        }

        public async Task<(
            List<RelatorioCategoriaDto> Categorias,
            decimal TotalReceitas,
            decimal TotalDespesas,
            decimal SaldoGeral
        )> ObterTotaisPorCategoriaAsync()
        {
            var categorias = await _context.Categorias
                .AsNoTracking()
                .ToListAsync();

            var transacoes = await _context.Transacoes
                .AsNoTracking()
                .ToListAsync();

            var totaisPorCategoriaId = transacoes
                .GroupBy(t => t.CategoriaId)
                .ToDictionary(
                    g => g.Key,
                    g =>
                    {
                        var receitas = g.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                        var despesas = g.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);
                        return (Receitas: receitas, Despesas: despesas);
                    });

            var resultado = new List<RelatorioCategoriaDto>(categorias.Count);

            foreach (var categoria in categorias)
            {
                var (receitas, despesas) = totaisPorCategoriaId.TryGetValue(categoria.Id, out var totais)
                    ? totais
                    : (0m, 0m);

                resultado.Add(new RelatorioCategoriaDto
                {
                    CategoriaId = categoria.Id,
                    DescricaoCategoria = categoria.Descricao,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas
                });
            }

            var totalReceitas = resultado.Sum(r => r.TotalReceitas);
            var totalDespesas = resultado.Sum(r => r.TotalDespesas);

            return (
                resultado,
                totalReceitas,
                totalDespesas,
                totalReceitas - totalDespesas
            );
        }
    }
}