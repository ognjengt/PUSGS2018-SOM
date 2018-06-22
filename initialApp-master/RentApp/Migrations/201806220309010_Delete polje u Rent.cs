namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeletepoljeuRent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rents", "Deleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Rents", "Deleted");
        }
    }
}
