using ControleGastos.Api.Data; // ajuste namespace
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Tests;

public static class TestDbContextFactory
{
    public static AppDbContext CreateInMemoryDbContext()
    {
        // Nome único por teste garante isolamento total (sem sujeira de outro teste)
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }
}