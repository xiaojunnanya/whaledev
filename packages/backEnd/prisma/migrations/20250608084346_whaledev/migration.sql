-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 0,
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL DEFAULT '鲸灵开发用户',
    `avatar` VARCHAR(191) NULL DEFAULT '/avatar/default-avatar.jpg',

    UNIQUE INDEX `user_user_id_key`(`user_id`),
    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `user_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 0,
    `project_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `project_name` VARCHAR(191) NOT NULL,
    `project_desc` VARCHAR(191) NULL,
    `project_type` ENUM('reception', 'backstage', 'page') NOT NULL,
    `project_state` ENUM('inProgress', 'completed', 'paused', 'obsolete') NOT NULL,

    UNIQUE INDEX `project_project_id_key`(`project_id`),
    INDEX `project_user_id_project_id_idx`(`user_id`, `project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 0,
    `page_id` VARCHAR(191) NOT NULL,
    `project_id` VARCHAR(191) NOT NULL,
    `page_name` VARCHAR(191) NOT NULL,
    `page_type` ENUM('custom', 'template', 'flow') NOT NULL,

    UNIQUE INDEX `pages_page_id_key`(`page_id`),
    INDEX `pages_page_id_project_id_idx`(`page_id`, `project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_json` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` INTEGER NOT NULL DEFAULT 0,
    `page_id` VARCHAR(191) NOT NULL,
    `page_json` MEDIUMTEXT NOT NULL,

    UNIQUE INDEX `page_json_page_id_key`(`page_id`),
    INDEX `page_json_page_id_idx`(`page_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
