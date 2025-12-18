using ControleGastos.Api.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Tests
{
    public static class TestDbContextFactory
    {
        public static AppDbContext CreateSqliteInMemoryDbContext()
        {
            // SQLite em memória: comportamento mais próximo do banco real
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(connection)
                .Options;

            var context = new AppDbContext(options);

            // Cria o schema no banco em memória
            context.Database.EnsureCreated();

            return context;
        }
    }
}