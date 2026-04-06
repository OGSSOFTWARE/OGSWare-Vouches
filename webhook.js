const response = await fetch("https://api.sellauth.com/v1/feedbacks/...");

export async function handleSellAuthWebhook(req, res, client) {
  try {
    const { event, data } = req.body;

    // Only handle feedback events
    if (event !== "NOTIFICATION.SHOP_FEEDBACK_CREATED") {
      return res.status(200).send("Ignored event");
    }

    const feedbackId = data.feedback_id;

    // Fetch full feedback details from SellAuth API
    const response = await fetch(`https://api.sellauth.com/v1/feedbacks/${feedbackId}`, {
      headers: {
        Authorization: `Bearer ${process.env.SELLAUTH_API_KEY}`
      }
    });

    const feedback = await response.json();

    const stars = "⭐".repeat(feedback.rating);
    const vouchNumber = client.vouchCounter++;

    const embed = client.renderFeedbackEmbed({
      vouchNumber,
      stars,
      comment: feedback.feedback,
      user_display: feedback.discord_id ? `<@${feedback.discord_id}>` : "SellAuth Client",
      created_at: new Date(feedback.created_at).toLocaleString(),

      // 👇 YOUR LOGO for SellAuth vouches
      thumbnail: "https://media.discordapp.net/attachments/1490754874940325948/1490762334665314314/GIF.gif",

      image: null
    });

    const channel = client.channels.cache.get(client.config.vouchChannel);
    channel.send({ embeds: [embed] });

    client.saveCounter();

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing webhook");
  }
}
