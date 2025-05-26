import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

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
    res.status(500).json({ error: "Failed to create playlist" });
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await db.playlist.findMany({
      where: {
        userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playlists,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch playlist",
    });
  }
};

export const getPlaylistDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { playlistId } = req.params;

    if (!playlistId) {
      return (
        res.status(400),
        json({
          success: false,
          message: "PlaylistId is missing",
        })
      );
    }

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Playlist not found",
        })
      );
    }

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    res.status(500),
      json({
        success: false,
        message: "Failed to fetch playlist",
      });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    if (!playlistId) {
      return res.status(400).json({ error: "PlaylistId is missing" });
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemIds " });
    }

    //create record for each problem in playlist
    const problemsInPlaylist = await db.ProblemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add problem in playlist" });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!playlistId) {
      return res.status(400).json({ error: "PlaylistId is missing" });
    }

    const deletePlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlist deleted sucessfully",
      deletePlaylist,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete playlist" });
  }
};
export const removeProblemFromPlaylist = async (req, res) => {};
