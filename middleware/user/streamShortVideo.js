import fs from "fs";
import path from "path";

export const streamShortVideo = async (req, res) => {
  try {
    const filename = req.params.filename; // Get filename from URL
    
    // Build the complete file path
    const filePath = path.join(
      process.cwd(),
      "uploads/admin/short_video/videos",
      filename
    );

    

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Video file not found");
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // If browser requests a specific part of video (for seeking/scrubbing)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      });

      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      // Stream entire video
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
      });

      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.error("Stream error:", error);
    res.status(500).send("Server error");
  }
};