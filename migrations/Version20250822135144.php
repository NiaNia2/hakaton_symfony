<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250822135144 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ajoute les uniter';
    }

    public function up(Schema $schema): void
    {
        // Archer
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (1, 'Archer',35,3,5,12,'Archer attentif, dont chaque flèche semble guidée par une intuition presque mystique','Blue');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (2, 'Archer',40,3,8,5,'Archer de l’ombre, qui traque ses cibles avec une précision froide et implacable','Black');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (3, 'Archer',32,5,5,6,'Archer véloce, toujours en mouvement, dont les tirs surprennent par leur rapidité','Yellow');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (4, 'Archer',42,3,9,4,'Archer fougueux, qui ne craint pas de s’exposer pour décocher ses traits meurtriers','Red');");

        // Lancier
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (5, 'Lancer',55,3,6,11,'Lancier noble, porteur d’une force qui semble bénie par une énergie supérieure','Blue');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (6, 'Lancer',60,3,9,5,'Lancier brutal, qui manie sa lance comme un instrument de domination','Black');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (7, 'Lancer',50,5,6,6,'Lancier éclaireur, rapide et précis, frappant comme un éclair','Yellow');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (8, 'Lancer',70,3,10,4,'Lancier impétueux, qui charge avec une détermination ardente et inébranlable','Red');");

        // Monk
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (9, 'Monk',55,3,6,11,'Moine méditatif, dont la force intérieure s’exprime dans chacun de ses gestes','Blue');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (10, 'Monk',60,3,9,5,'Moine guerrier marqué par les ténèbres, dont la discipline se mue en fureur','Black');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (11, 'Monk',50,5,6,6,'Moine discipliné agile, dont les pas et les frappes forment une danse insaisissable','Yellow');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (12, 'Monk',70,3,10,4,'Moine combattant exalté, qui canalise sa ferveur en coups redoutables et implacables','Red');");

        // Warrior
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (13, 'Warrior',65,2,6,10,'Guerrier discipliné, qui mêle rigueur martiale et un lien mystérieux avec les arcanes','Blue');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (14, 'Warrior',70,2,9,4,'Guerrier impitoyable, nourri par une rage sombre et un désir de domination','Black');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (15, 'Warrior',60,4,6,5,'Guerrier vif et insaisissable, frappant avant que l’ennemi n’ait le temps de réagir','Yellow');");
        $this->addSql("INSERT INTO units (id, type, vita, initiative, att, mana, description, color) VALUES (16, 'Warrior',80,2,10,3,'Guerrier enragé, qui se jette au cœur de la bataille avec une soif de carnage','Red');");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        // Archer
        $this->addSql("DELETE FROM units WHERE type = 'Archer' AND color IN ('Blue','Black','Yellow','Red');");

        // Lancer
        $this->addSql("DELETE FROM units WHERE type = 'Lancer' AND color IN ('Blue','Black','Yellow','Red');");

        // Monk
        $this->addSql("DELETE FROM units WHERE type = 'Monk' AND color IN ('Blue','Black','Yellow','Red');");

        // Warrior
        $this->addSql("DELETE FROM units WHERE type = 'Warrior' AND color IN ('Blue','Black','Yellow','Red');");
    }
}
