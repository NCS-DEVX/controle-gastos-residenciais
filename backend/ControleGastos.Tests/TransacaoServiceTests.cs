using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Enums;
using ControleGastos.Api.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace ControleGastos.Tests;

public class TransacaoServiceTests
{
    [Fact]
    public async Task CriarTransacao_QuandoPessoaMenorDeIdadeEReceita_DeveFalhar()
    {
        // Arrange
        await using var db = TestDbContextFactory.CreateSqliteInMemoryDbContext();

        var pessoa = new Pessoa { Nome = "Nathan", Idade = 17 };

        var categoria = new Categoria
        {
            Descricao = "Mesada",
            Finalidade = FinalidadeCategoria.Receita
        };

        db.Pessoas.Add(pessoa);
        db.Categorias.Add(categoria);
        await db.SaveChangesAsync();

        var service = new TransacaoService(db);

        var transacao = new Transacao
        {
            Descricao = "Receita indevida",
            Valor = 100m,
            Tipo = TipoTransacao.Receita,
            PessoaId = pessoa.Id,
            CategoriaId = categoria.Id
        };

        // Act + Assert
        var ex = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            service.CriarAsync(transacao));

        Assert.Contains("menor", ex.Message, StringComparison.OrdinalIgnoreCase);
        Assert.Equal(0, await db.Transacoes.CountAsync());
    }

    [Fact]
    public async Task CriarTransacao_QuandoTipoDespesaECategoriaEhSomenteReceita_DeveFalhar()
    {
        // Arrange
        await using var db = TestDbContextFactory.CreateSqliteInMemoryDbContext();

        var pessoa = new Pessoa { Nome = "Nathan", Idade = 25 };

        var categoriaSomenteReceita = new Categoria
        {
            Descricao = "Salário",
            Finalidade = FinalidadeCategoria.Receita
        };

        db.Pessoas.Add(pessoa);
        db.Categorias.Add(categoriaSomenteReceita);
        await db.SaveChangesAsync();

        var service = new TransacaoService(db);

        var transacao = new Transacao
        {
            Descricao = "Despesa indevida",
            Valor = 50m,
            Tipo = TipoTransacao.Despesa,
            PessoaId = pessoa.Id,
            CategoriaId = categoriaSomenteReceita.Id
        };

        // Act + Assert
        var ex = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            service.CriarAsync(transacao));

        Assert.Contains("categoria", ex.Message, StringComparison.OrdinalIgnoreCase);
        Assert.Equal(0, await db.Transacoes.CountAsync());
    }
}
