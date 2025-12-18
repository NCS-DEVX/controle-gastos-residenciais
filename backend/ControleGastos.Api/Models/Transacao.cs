using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models.Enums;

namespace ControleGastos.Api.Models
{
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(200)]
        public string Descricao { get; set; } = string.Empty;

        // Validação básica para bloquear valores inválidos já no ModelState.
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor da transação deve ser maior que zero.")]
        public decimal Valor { get; set; }

        [Required]
        [EnumDataType(typeof(TipoTransacao), ErrorMessage = "Tipo de transação inválido.")]
        public TipoTransacao Tipo { get; set; }

        [Required]
        public int PessoaId { get; set; }

        [Required]
        public int CategoriaId { get; set; }
    }
}