//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class ActivityProduct
    {
        public int id { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public System.DateTime from_date { get; set; }
        public System.DateTime to_date { get; set; }
        public decimal price { get; set; }
        public string duration { get; set; }
        public bool is_saved { get; set; }
        public bool is_booked { get; set; }
    }
}
