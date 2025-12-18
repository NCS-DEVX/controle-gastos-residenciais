using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models.Enums;

namespace ControleGastos.Api.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(120)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
