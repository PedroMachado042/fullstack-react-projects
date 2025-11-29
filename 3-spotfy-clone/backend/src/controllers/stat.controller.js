import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promisse.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        //fetch all songs, then fetch all albums, merge both collections, group by artist and count unique artists
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: $artist,
            },
          },
          {
            $count: "count",
          }
        ]),
      ]);
      res.status(200).json({
        totalSongs,
        totalUsers,
        totalAlbums,
        // just plain weird code
        totalArtists: uniqueArtists[0]?.count || 0,
      });
  } catch (error) {
    next(error);
  }
}