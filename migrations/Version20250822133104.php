<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250822133104 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE units (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, vita INT NOT NULL, initiative INT NOT NULL, att INT NOT NULL, mana INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE teams ADD unit_one_id INT DEFAULT NULL, ADD unit_two_id INT DEFAULT NULL, ADD unit_three_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE teams ADD CONSTRAINT FK_96C222586CC325E5 FOREIGN KEY (unit_one_id) REFERENCES units (id)');
        $this->addSql('ALTER TABLE teams ADD CONSTRAINT FK_96C2225879FC22A FOREIGN KEY (unit_two_id) REFERENCES units (id)');
        $this->addSql('ALTER TABLE teams ADD CONSTRAINT FK_96C2225829FE7F7 FOREIGN KEY (unit_three_id) REFERENCES units (id)');
        $this->addSql('CREATE INDEX IDX_96C222586CC325E5 ON teams (unit_one_id)');
        $this->addSql('CREATE INDEX IDX_96C2225879FC22A ON teams (unit_two_id)');
        $this->addSql('CREATE INDEX IDX_96C2225829FE7F7 ON teams (unit_three_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE teams DROP FOREIGN KEY FK_96C222586CC325E5');
        $this->addSql('ALTER TABLE teams DROP FOREIGN KEY FK_96C2225879FC22A');
        $this->addSql('ALTER TABLE teams DROP FOREIGN KEY FK_96C2225829FE7F7');
        $this->addSql('DROP TABLE units');
        $this->addSql('DROP INDEX IDX_96C222586CC325E5 ON teams');
        $this->addSql('DROP INDEX IDX_96C2225879FC22A ON teams');
        $this->addSql('DROP INDEX IDX_96C2225829FE7F7 ON teams');
        $this->addSql('ALTER TABLE teams DROP unit_one_id, DROP unit_two_id, DROP unit_three_id');
    }
}
