export function seed(knex) {
  return knex('teams').insert([
    {
      team: 'T00000001',
      triggers: [
        {
          trigger: { match: '^Happy F(ri|ir)day*', flags: 'i' },
          daysOfWeek: [5, 6],
          timeout: 15 * 60,
          responses: [
            'And a Happy Friday to you too! Enjoy the original video, the one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0',
            'Looking forward to that weekend! Here\'s one with Lyrics: https://www.youtube.com/watch?v=DPVTl9K0lqc',
            'Thanks! Celebrate with the new remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y',
            'You too! Here\'s a cover by Katy Perry. https://www.youtube.com/watch?v=sM51ANnSgsU',
            'For all the metal fans. https://www.youtube.com/watch?v=9mHDAYutrC0',
            'It\'s Death Metal Friday! https://www.youtube.com/watch?v=pi00ykRg_5c',
            'Something a little different this time. Annoying Orange! https://www.youtube.com/watch?v=akT0wxv9ON8',
            'Did you know Rebecca Black has some other songs too? Here\'s Girlfriend: https://www.youtube.com/watch?v=pEy5x-vTH4g'
          ],
          state: { next: 0 }
        },
  //   {trigger: { match: '^Happy Humpday*', flags: 'i' }, daysOfWeek: [6, 3], timeout: 15 * 60, responses: [
  //     'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif'
  //   ], state: { next: 0 }}

      ]
    },
    {
      team: 'T00000002',
      triggers: [
        {

        }
      ]
    },

  ]);
}
