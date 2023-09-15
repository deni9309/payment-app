using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentAPI.Models
{
    public class PaymentDetail
    {
        [Key]
        public Guid PaymentDetailId { get; set; } = new Guid();

        [Required]
        [Column(TypeName ="nvarchar(100)")]
        public required string CardOwnerName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(16)")]
        public required string CardNumber { get; set; }
        
        [Required]
        [Column(TypeName = "nvarchar(5)")]
        public required string ExpirationDate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(3)")]
        public required string SecurityCode { get; set; }
    }
}
