import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
  "https://storage.googleapis.com/aistudio-janus-prod-app-data/user_data/ajayshan47%40gmail.com/1744443881453-61e89f8160029b3a03c3960d7f1d4317.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-app-data/user_data/ajayshan47%40gmail.com/1744443881453-5d7d91e605d39999086119b48f98642a.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-app-data/user_data/ajayshan47%40gmail.com/1744443881453-8d0b5036137a8b3084f70823c914b18f.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-app-data/user_data/ajayshan47%40gmail.com/1744443881452-f67384a511c500c500f40bfb7d90f23d.jpg",
  "https://storage.googleapis.com/aistudio-janus-prod-app-data/user_data/ajayshan47%40gmail.com/1744443881453-e380292723a1a5470557e4e135f60634.jpg"
];

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

urls.forEach((url, index) => {
  const filename = "image" + (index + 1) + ".jpg";
  const dest = path.join(publicDir, filename);
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log("Downloaded " + filename);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error("Error downloading " + filename + ": " + err.message);
  });
});
