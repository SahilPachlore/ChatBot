import openaiClient from "./api.js";

const generate = async (queryDescription, temperature) => {

  const daVinci = async (queryDescription) => {
    const response = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: `Convert the following natural language description into a SQL query:\n\n${queryDescription}`,
      max_tokens: 100,
      temperature: 0,
    });
    return response.data.choices[0].text;
  };
  // const sqlQuery1 = await daVinci(queryDescription);
  // return sqlQuery1;

  const chatGPT = async (queryDescription) => {
    const message = [
      { role: "system", content: `You are a little Storyteller AI bot.` },
      { role: "user", content: `Convert the following natural language description into Short story.\n\nA goat that lives on a boat` },
      { role: "assistant", content: `Title:A Sailing Billy: The Adventures of a Boat-Bound Goat
      Once upon a time there lived a goat on a boat. He loved to sail around with the fish and the other creatures in the sea!
      Every day he would hop on to his boat, spread out his sails, and take off for adventure.

What made his boat really special was that it never needed fuel, it was powered by the wind and the waves!

He enjoyed feeling the warmth of the sun on him during the day, and gazing up at all of the stars at night as he slept peacefully on his boat.

One day he decided to go explore a nearby island that he had heard about from one of his friends who also lived in the sea.

As he approached the island, he saw something unusual - goats living in the trees! He couldn't believe it!

The goats noticed him, too, and they started to ask him questions about where he had come from and why he was riding a boat instead of walking like them.

The goat explained how much fun sailing was and soon all of them were begging to join him on his next adventure!

So with a few extra passengers aboard (the goats), they set sail again - destination unknown!

Along their journey they chatted happily about everything they encountered - from schools of glittering fish to huge whales that splashed alongside their boat - until finally they reached an even more magical place: an island full of candy trees!

The goats couldn't believe their eyes as they feasted away on all sorts of tasty treats while enjoying an incredible view from high above in one of the candy tree's branches!

After some fun exploring they returned home with plenty of stories to share with everyone else back at sea - proving that sometimes even goats can find some amazing adventures when you least expect them!` },
      { role: "user", content: `Convert the following natural language description into Short story:\n\n${queryDescription}` },
    ];
    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: temperature,
    });

    return response.data.choices[0].message.content;
  }

  const sqlQuery = await chatGPT(queryDescription);
  return sqlQuery;

};

export default generate;