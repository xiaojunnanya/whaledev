/*
  Warnings:

  - You are about to drop the column `Page_type` on the `pages` table. All the data in the column will be lost.
  - You are about to alter the column `created_time` on the `pages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `pages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_time` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `page_type` to the `pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pages` DROP COLUMN `Page_type`,
    ADD COLUMN `page_type` ENUM('custom', 'template', 'flow') NOT NULL,
    MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `project` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `user` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();
