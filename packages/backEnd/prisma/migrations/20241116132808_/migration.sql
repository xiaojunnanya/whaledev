-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL DEFAULT '鲸灵开发用户',
    `avatar` VARCHAR(191) NULL DEFAULT '/avatar/default-avatar.jpg',
    `created_time` DATETIME NOT NULL DEFAULT NOW(),
    `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    `status` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `user_user_id_key`(`user_id`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `project_desc` VARCHAR(191) NULL,
    `project_type` ENUM('reception', 'backstage') NOT NULL,
    `project_state` ENUM('inProgress', 'completed', 'paused', 'obsolete') NOT NULL,
    `created_time` DATETIME NOT NULL DEFAULT NOW(),
    `updated_time` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    `status` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `project_project_id_key`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
