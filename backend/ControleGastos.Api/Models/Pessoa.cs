using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(120)]
        public string Nome { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "A idade deve ser um inteiro positivo.")]
        public int Idade { get; set; }
    }
}
