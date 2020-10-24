using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace CustomerNoSQLs.Models
{
    public class CustomerNoSQL
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int LOG_ID { get; set; } = 1234;

        public int CUS_ID { get; set; } = 12345;
        public int SHOP_ID { get; set; } = 12345;

        public DateTime Active_Time_Log { get; set; } = DateTime.Now;

        public string ProductType { get; set; } = "Eletronics";
        public string Phone { get; set; } = "123-555-555";
    }
}