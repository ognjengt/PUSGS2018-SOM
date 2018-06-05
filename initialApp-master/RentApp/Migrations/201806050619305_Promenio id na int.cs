namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Promenioidnaint : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Rents", "BranchOffice_Id", "dbo.BranchOffices");
            DropForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes");
            DropIndex("dbo.Rents", new[] { "BranchOffice_Id" });
            DropIndex("dbo.Rents", new[] { "Vehicle_Id" });
            DropIndex("dbo.Vehicles", new[] { "Type_Id" });
            DropPrimaryKey("dbo.Rents");
            DropPrimaryKey("dbo.BranchOffices");
            DropPrimaryKey("dbo.Vehicles");
            DropPrimaryKey("dbo.VehicleTypes");
            AlterColumn("dbo.Rents", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Rents", "BranchOffice_Id", c => c.Int());
            AlterColumn("dbo.Rents", "Vehicle_Id", c => c.Int());
            AlterColumn("dbo.BranchOffices", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Vehicles", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Vehicles", "Type_Id", c => c.Int());
            AlterColumn("dbo.VehicleTypes", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Rents", "Id");
            AddPrimaryKey("dbo.BranchOffices", "Id");
            AddPrimaryKey("dbo.Vehicles", "Id");
            AddPrimaryKey("dbo.VehicleTypes", "Id");
            CreateIndex("dbo.Rents", "BranchOffice_Id");
            CreateIndex("dbo.Rents", "Vehicle_Id");
            CreateIndex("dbo.Vehicles", "Type_Id");
            AddForeignKey("dbo.Rents", "BranchOffice_Id", "dbo.BranchOffices", "Id");
            AddForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles", "Id");
            AddForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes");
            DropForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Rents", "BranchOffice_Id", "dbo.BranchOffices");
            DropIndex("dbo.Vehicles", new[] { "Type_Id" });
            DropIndex("dbo.Rents", new[] { "Vehicle_Id" });
            DropIndex("dbo.Rents", new[] { "BranchOffice_Id" });
            DropPrimaryKey("dbo.VehicleTypes");
            DropPrimaryKey("dbo.Vehicles");
            DropPrimaryKey("dbo.BranchOffices");
            DropPrimaryKey("dbo.Rents");
            AlterColumn("dbo.VehicleTypes", "Id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Vehicles", "Type_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Vehicles", "Id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.BranchOffices", "Id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Rents", "Vehicle_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Rents", "BranchOffice_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Rents", "Id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.VehicleTypes", "Id");
            AddPrimaryKey("dbo.Vehicles", "Id");
            AddPrimaryKey("dbo.BranchOffices", "Id");
            AddPrimaryKey("dbo.Rents", "Id");
            CreateIndex("dbo.Vehicles", "Type_Id");
            CreateIndex("dbo.Rents", "Vehicle_Id");
            CreateIndex("dbo.Rents", "BranchOffice_Id");
            AddForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes", "Id");
            AddForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles", "Id");
            AddForeignKey("dbo.Rents", "BranchOffice_Id", "dbo.BranchOffices", "Id");
        }
    }
}
