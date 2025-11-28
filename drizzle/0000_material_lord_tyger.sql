CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(2048) NOT NULL,
	"code" varchar(10) NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"last_clicked" timestamp DEFAULT null,
	CONSTRAINT "links_code_unique" UNIQUE("code")
);
