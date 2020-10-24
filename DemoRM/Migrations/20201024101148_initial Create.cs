using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoRM.Migrations
{
    public partial class initialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_customer",
                columns: table => new
                {
                    LOG_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CUS_ID = table.Column<int>(nullable: false),
                    SHOP_ID = table.Column<int>(nullable: false),
                    Active_Time_Log = table.Column<DateTime>(nullable: false),
                    Product_Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_customer", x => x.LOG_ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_customer");
        }
    }
}
