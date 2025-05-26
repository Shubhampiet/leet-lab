import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;
    console.log("userId>>>>>>", userId)

    if (!name) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Playlist name is missing",
        })
      );
    }

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlist created successsfully",
      playlist,
    });
  } catch (error) {
    console.log("createPlaylist error", error);
    res.status(500).json({ error: "Failed to create playlist" });
  }
};

export const getAllListDetails = async (req, res) => {};
export const getPlaylistDetails = async (req, res) => {};
export const addProblemToPlaylist = async (req, res) => {};
export const deletePlaylist = async (req, res) => {};
export const removeProblemFromPlaylist = async (req, res) => {};
