/*
  Warnings:

  - You are about to alter the column `created_time` on the `page_json` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `page_json` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_time` on the `pages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `pages` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_time` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `project` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_time` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `page_json` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `pages` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `project` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `user` MODIFY `created_time` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AddForeignKey
ALTER TABLE `page_json` ADD CONSTRAINT `page_json_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `pages`(`page_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
