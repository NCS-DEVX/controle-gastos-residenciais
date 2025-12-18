using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Enums;
using ControleGastos.Api.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;


namespace ControleGastos.Tests
{
    public class PessoaServiceTests
    {
        [Fact]
        public async Task RemoverAsync_DeveRemoverPessoaETransacoesAssociadas()
        {
            // Arrange
            await using var db = TestDbContextFactory.CreateSqliteInMemoryDbContext();

            var pessoa = new Pessoa
            {
                Nome = "Nathan",
                Idade = 30
            };

            var categoria = new Categoria
            {
                Descricao = "Alimentação",
                Finalidade = FinalidadeCategoria.Despesa
            };

            db.Pessoas.Add(pessoa);
            db.Categorias.Add(categoria);
            await db.SaveChangesAsync();

            db.Transacoes.AddRange(
                new Transacao
                {
                    Descricao = "Almoço",
                    Valor = 25m,
                    Tipo = TipoTransacao.Despesa,
                    PessoaId = pessoa.Id,
                    CategoriaId = categoria.Id
                },
                new Transacao
                {
                    Descricao = "Jantar",
                    Valor = 40m,
                    Tipo = TipoTransacao.Despesa,
                    PessoaId = pessoa.Id,
                    CategoriaId = categoria.Id
                }
            );

            await db.SaveChangesAsync();

            var service = new PessoaService(db);

            // Act
            await service.RemoverAsync(pessoa.Id);

            // Assert
            Assert.False(await db.Pessoas.AnyAsync(), "A pessoa deveria ter sido removida.");
            Assert.False(await db.Transacoes.AnyAsync(), "As transações da pessoa deveriam ter sido removidas.");
        }

        [Fact]
        public async Task RemoverAsync_QuandoPessoaNaoExiste_DeveLancarKeyNotFoundException()
        {
            // Arrange
            await using var db = TestDbContextFactory.CreateSqliteInMemoryDbContext();
            var service = new PessoaService(db);

            // Act + Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(
                () => service.RemoverAsync(999)
            );
        }
    }
}