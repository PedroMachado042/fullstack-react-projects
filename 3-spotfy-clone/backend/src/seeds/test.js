import mongoose from "mongoose";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const SONGS_DIR = resolve(__dirname, "../../../frontend/public/songs");

config();

const albumNames = ["Do Rock", "Chilling", "Nacionais", "Uplifting"];
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Clear existing data
        await Album.deleteMany({});
        await Song.deleteMany({});

        // Lê todas as subpastas (1, 2, 3, 4) e seus mp3s
        const folders = readdirSync(SONGS_DIR)
            .filter((item) => statSync(join(SONGS_DIR, item)).isDirectory())
            .sort();

        const filesByFolder = folders.map((folder) => ({
            folder,
            files: readdirSync(join(SONGS_DIR, folder)).filter((f) => f.endsWith(".mp3")),
        }));

        const allFiles = filesByFolder.flatMap(({ folder, files }) =>
            files.map((file) => ({ file, folder }))
        );

        // First, create all songs
        const createdSongs = await Song.insertMany(
            allFiles.map(({ file, folder }) => {
                const name = file.replace(".mp3", "");
                const [title, artist] = name.split(" - ");
                return {
                    title,
                    artist,
                    imageUrl: `/cover-images/${folder}/${title}.jpg`,
                    audioUrl: `/songs/${folder}/${file}`,
                    plays: Math.floor(Math.random() * 5000),
                    duration: 40,
                };
            })
        );

        // Create albums with references to song IDs — um álbum por pasta
        let songIndex = 0;
        const albums = filesByFolder.map(({ folder, files }, i) => {
            const folderSongs = createdSongs
                .slice(songIndex, songIndex + files.length)
                .map((song) => song._id);
            songIndex += files.length;

            return {
                title: albumNames[i],
                artist: "Various Artists",
                imageUrl: `/albums/${folder}.jpg`,
                releaseYear: new Date().getFullYear(),
                songs: folderSongs,
            };
        });

        // Insert all albums
        const createdAlbums = await Album.insertMany(albums);

        // Update songs with their album references
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albums[i].songs;

            await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
        }

        console.log("Database seeded successfully!");
        console.log(`   ${createdSongs.length} músicas inseridas`);
        console.log(`   ${createdAlbums.length} álbuns criados`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();