export default async function handler(req, res) {
  try {
    const foxResponses = await Promise.all(
      Array.from({ length: 15 }, () => fetch("https://randomfox.ca/floof/"))
    );

    const foxData = await Promise.all(foxResponses.map((r) => r.json()));

    const today = new Date().toISOString().split("T")[0];

    res.status(200).json({
      author: {
        name: "RandomFox API",
        channelName: "Random Fox Feed",
        userSince: "2026",
        avatar: "https://randomfox.ca/images/1.jpg",
      },
      images: foxData.map((fox, index) => ({
        id: index + 1,
        name: `Fox ${index + 1}`,
        dateTaken: today,
        thumbnailSrc: fox.image,
        fullSrc: fox.image,
        caption: `Random fox image ${index + 1} loaded from the API endpoint`,
        link: fox.link,
      })),
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load fox data",
    });
  }
}