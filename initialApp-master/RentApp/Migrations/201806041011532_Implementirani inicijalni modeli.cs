namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Implementiraniinicijalnimodeli : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BranchOffices",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        Logo = c.String(),
                        Address = c.String(),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        Service_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Services", t => t.Service_Id)
                .Index(t => t.Service_Id);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Model = c.String(),
                        Manufactor = c.String(),
                        Year = c.Int(nullable: false),
                        Description = c.String(),
                        PricePerHour = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Unavailable = c.Boolean(nullable: false),
                        Type_Id = c.String(maxLength: 128),
                        Service_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.VehicleTypes", t => t.Type_Id)
                .ForeignKey("dbo.Services", t => t.Service_Id)
                .Index(t => t.Type_Id)
                .Index(t => t.Service_Id);
            
            CreateTable(
                "dbo.VehicleTypes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AppUsers", "Email", c => c.String());
            AddColumn("dbo.AppUsers", "Birthday", c => c.DateTime(nullable: false));
            AddColumn("dbo.AppUsers", "Image", c => c.String());
            AddColumn("dbo.AppUsers", "Activated", c => c.Boolean(nullable: false));
            AddColumn("dbo.Services", "Logo", c => c.String());
            AddColumn("dbo.Services", "Email", c => c.String());
            AddColumn("dbo.Services", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicles", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes");
            DropForeignKey("dbo.BranchOffices", "Service_Id", "dbo.Services");
            DropIndex("dbo.Vehicles", new[] { "Service_Id" });
            DropIndex("dbo.Vehicles", new[] { "Type_Id" });
            DropIndex("dbo.BranchOffices", new[] { "Service_Id" });
            DropColumn("dbo.Services", "Description");
            DropColumn("dbo.Services", "Email");
            DropColumn("dbo.Services", "Logo");
            DropColumn("dbo.AppUsers", "Activated");
            DropColumn("dbo.AppUsers", "Image");
            DropColumn("dbo.AppUsers", "Birthday");
            DropColumn("dbo.AppUsers", "Email");
            DropTable("dbo.VehicleTypes");
            DropTable("dbo.Vehicles");
            DropTable("dbo.BranchOffices");
        }
    }
}
