using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
        public DbSet<Categoria> Categorias => Set<Categoria>();
        public DbSet<Transacao> Transacoes => Set<Transacao>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transacao>()
                .HasOne<Pessoa>()
                .WithMany()
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade); // Regra: excluir Pessoa remove suas Transações.

            modelBuilder.Entity<Transacao>()
                .HasOne<Categoria>()
                .WithMany()
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict); // Evita apagar Categoria com histórico de transações.
        }
    }
}
