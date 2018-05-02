using System.ComponentModel.DataAnnotations;
using System;

namespace WebAPI_NG_TokenbasedAuth.Models
{
    public class TimeTrackingModel
    {
        public string Username { get; set; }

        [Required]
        [Display(Name = "Start Time")]
        public DateTime Start { get; set; }

        [Required]
        [Display(Name = "End Time")]
        public DateTime End { get; set; }
    }

    public class TimeTrack
    {
        [Key]
        public DateTime Date { get; set; }

        public byte Hours { get; set; }
    }
}