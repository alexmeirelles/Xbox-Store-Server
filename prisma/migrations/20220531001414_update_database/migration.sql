-- CreateTable
CREATE TABLE "jogo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "imdbScore" INTEGER NOT NULL,
    "trailerYoutubeUrl" TEXT NOT NULL,
    "gameplayYoutubeUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genero" (
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JogosToPerfis" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenerosToJogos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "genero_name_key" ON "genero"("name");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_JogosToPerfis_AB_unique" ON "_JogosToPerfis"("A", "B");

-- CreateIndex
CREATE INDEX "_JogosToPerfis_B_index" ON "_JogosToPerfis"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenerosToJogos_AB_unique" ON "_GenerosToJogos"("A", "B");

-- CreateIndex
CREATE INDEX "_GenerosToJogos_B_index" ON "_GenerosToJogos"("B");

-- AddForeignKey
ALTER TABLE "perfil" ADD CONSTRAINT "perfil_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JogosToPerfis" ADD CONSTRAINT "_JogosToPerfis_A_fkey" FOREIGN KEY ("A") REFERENCES "jogo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JogosToPerfis" ADD CONSTRAINT "_JogosToPerfis_B_fkey" FOREIGN KEY ("B") REFERENCES "perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenerosToJogos" ADD CONSTRAINT "_GenerosToJogos_A_fkey" FOREIGN KEY ("A") REFERENCES "genero"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenerosToJogos" ADD CONSTRAINT "_GenerosToJogos_B_fkey" FOREIGN KEY ("B") REFERENCES "jogo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
