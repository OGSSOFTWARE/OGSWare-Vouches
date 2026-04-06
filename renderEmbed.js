import { EmbedBuilder } from "discord.js";

export function renderFeedbackEmbed(data) {
  return new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("New Vouch Received 🎉")
    .setDescription(`${data.stars}\n\n**Feedback:**\n${data.comment}`)
    .addFields(
      {
        name: "Vouch Number:",
        value: `${data.vouchNumber}`,
        inline: true
      },
      {
        name: "Vouched By:",
        value: `${data.user_display}`,
        inline: true
      },
      {
        name: "Vouched At:",
        value: `${data.created_at}`,
        inline: true
      }
    )
    .setThumbnail(data.thumbnail)
    .setImage(data.image || null)
    .setFooter({
      text: `OGSWare Vouches • ${data.created_at}`,
      iconURL: "https://media.discordapp.net/attachments/1490754874940325948/1490762334665314314/GIF.gif"
    });
}
