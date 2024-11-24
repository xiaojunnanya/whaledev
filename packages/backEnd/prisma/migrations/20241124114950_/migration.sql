/*
  Warnings:

  - You are about to alter the column `created_time` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[project_router_id]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `project_router_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `project_router_id` VARCHAR(191) NOT NULL,
    MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `user` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- CreateTable
CREATE TABLE `pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` VARCHAR(191) NOT NULL,
    `page_id` VARCHAR(191) NOT NULL,
    `page_router_id` VARCHAR(191) NOT NULL,
    `page_name` VARCHAR(191) NOT NULL,
    `Page_type` ENUM('custom', 'template', 'flow') NOT NULL,
    `created_time` DATETIME NOT NULL DEFAULT NOW(),
    `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    `status` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `pages_page_id_key`(`page_id`),
    UNIQUE INDEX `pages_page_router_id_key`(`page_router_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `project_project_router_id_key` ON `project`(`project_router_id`);
