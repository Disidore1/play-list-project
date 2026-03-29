export default async function handler(req, res) {
  try {
    const foxResponses = await Promise.all([
      fetch("https://randomfox.ca/floof/"),
      fetch("https://randomfox.ca/floof/"),
      fetch("https://randomfox.ca/floof/"),
    ]);

    const foxData = await Promise.all(foxResponses.map((r) => r.json()));

    res.status(200).json({
      author: {
        name: "RandomFox API",
        channelName: "Random Fox Feed",
        userSince: "2026",
        avatar: "https://randomfox.ca/images/1.jpg"
      },
      images: foxData.map((fox, index) => ({
        id: index + 1,
        title: `Fox ${index + 1}`,
        caption: "Random fox image loaded from the API endpoint",
        full: fox.image,
        thumbnail: fox.image,
        link: fox.link
      }))
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load fox data"
    });
  }
}