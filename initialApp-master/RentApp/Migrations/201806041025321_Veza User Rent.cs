namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VezaUserRent : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rents",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Start = c.DateTime(),
                        End = c.DateTime(),
                        BranchOffice_Id = c.String(maxLength: 128),
                        Vehicle_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BranchOffices", t => t.BranchOffice_Id)
                .ForeignKey("dbo.Vehicles", t => t.Vehicle_Id)
                .Index(t => t.BranchOffice_Id)
                .Index(t => t.Vehicle_Id);
            
            AddColumn("dbo.AppUsers", "Rent_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.AppUsers", "Rent_Id");
            AddForeignKey("dbo.AppUsers", "Rent_Id", "dbo.Rents", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AppUsers", "Rent_Id", "dbo.Rents");
            DropForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Rents", "BranchOffice_Id", "dbo.BranchOffices");
            DropIndex("dbo.Rents", new[] { "Vehicle_Id" });
            DropIndex("dbo.Rents", new[] { "BranchOffice_Id" });
            DropIndex("dbo.AppUsers", new[] { "Rent_Id" });
            DropColumn("dbo.AppUsers", "Rent_Id");
            DropTable("dbo.Rents");
        }
    }
}
