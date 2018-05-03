﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI_NG_TokenbasedAuth.Models
{
    public class ClaimBindingModel
    {
        [Required]
        [Display(Name = "Claim Type")]
        public string Type { get; set; }

        [Required]
        [Display(Name = "Claim Value")]
        public string Value { get; set; }
    }
}