-- CreateTable
CREATE TABLE
  "key" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(6),
    "hashed_password" TEXT,
    "id" TEXT NOT NULL,
    "is_revoked" BOOLEAN DEFAULT false,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "key_pkey" PRIMARY KEY ("id")
  );

-- CreateTable
CREATE TABLE
  "profile" (
    "bio" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "github_link" TEXT,
    "id" TEXT NOT NULL,
    "instagram" TEXT,
    "occupation" TEXT,
    "twitter" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
  );

-- CreateTable
CREATE TABLE
  "session" (
    "created_at" TIMESTAMPTZ (6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ (6) NOT NULL,
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ (6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
  );

-- CreateTable
CREATE TABLE
  "user" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN DEFAULT false,
    "hashed_password" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "last_login" TIMESTAMPTZ (6),
    "name" TEXT,
    "profile_image_url" TEXT,
    "role" TEXT DEFAULT 'user',
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
  );

-- CreateIndex
CREATE UNIQUE INDEX "profile_id_key" ON "profile" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile" ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user" ("id");

-- AddForeignKey
ALTER TABLE "key" ADD CONSTRAINT "key_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;