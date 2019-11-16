const { db } = require('./server/db')
const { green, red } = require('chalk')

const Campus = require('./server/db/models/Campus')
const Student = require('./server/db/models/Student')

const campuses = [
  {
    id: 100,
    name: 'STAATLICHES BAUHAUS',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Bauhaus-Signet.svg/1920px-Bauhaus-Signet.svg.png',
    address: 'Am Horn 61, 99425 Weimar, Germany',
    description:
      'The German term Bauhaus — literally building house — was understood as meaning School of Building, but in spite of its name and the fact that its founder was an architect, the Bauhaus did not initially have an architecture department. Nonetheless, it was founded upon the idea of creating a Gesamtkunstwerk (total work of art) in which all the arts, including architecture, would eventually be brought together. The Bauhaus style later became one of the most influential currents in modern design, Modernist architecture and art, design, and architectural education. The Bauhaus movement had a profound influence upon subsequent developments in art, architecture, graphic design, interior design, industrial design, and typography.',
    createdAt: '2019-10-15T01:05:19.959Z',
    updatedAt: '2019-10-17T00:44:01.472Z',
  },
  {
    id: 102,
    name: 'Contemporary Feminist',
    imageUrl:
      'https://static01.nyt.com/images/2017/09/15/t-magazine/15tmag-kruger/15tmag-kruger-articleLarge.png?quality=90&auto=webp',
    address: '4 W 54th St, New York, NY 10019',
    description:
      'Art that seeks to challenge the dominance of men in both art and society, to gain recognition and equality for women artists, and to question assumptions about womanhood. Beginning in the 1960s and 1970s, feminist artists used a variety of mediums—including painting, performance art, and crafts historically considered “women’s work”—to make work aimed at ending sexism and oppression and exposing femininity to be a masquerade or set of poses adopted by women to conform to societal expectations. While many of the debates inaugurated in these decades are still ongoing, a younger generation of feminist artists takes an approach incorporating intersecting concerns about race, class, forms of privilege, and gender identity and fluidity. Both feminism and feminist art continue to evolve.',
    createdAt: '2019-10-17T01:44:08.101Z',
    updatedAt: '2019-10-17T01:44:08.101Z',
  },
  {
    id: 103,
    name: 'Ruin Academy',
    imageUrl:
      'https://images.adsttc.com/media/images/5147/3cd6/b3fc/4b93/2300/0024/slideshow/5029576711_a72250ce1a_b.jpg',
    address:
      'No. 1號, Section 3, Zhongxiao E Rd, Da’an District, Taipei City, Taiwan 106',
    description:
      "Ruin Academy (established 2010) is an independent cross-over architectural research center in the Urban Core area of Taipei City, Taiwan. It is 'set to re-think the industrial city and the modern man in the box' through research and a series of workshops. The Ruin Academy occupies an abandoned 5-story apartment building in central Taipei. All the interior walls of the building and all the windows are removed in order to grow bamboo and vegetables inside the house. The plants are situated so that their vegetation grows in front of the glassless window spaces, giving privacy to those inside. The professors and students are sleeping and working in mahogany made ad hoc dormitories and have a public sauna in the 5th floor. All the building is penetrated with 6 inch holes in order to let “rain inside”",
    createdAt: '2019-10-15T01:30:33.611Z',
    updatedAt: '2019-10-16T03:16:10.416Z',
  },
  {
    id: 104,
    name: 'Delete Me',
    imageUrl: 'https://live.staticflickr.com/8752/17121964950_cf8ec1d25d_b.jpg',
    address: 'i am garbage',
    description: null,
    createdAt: '2019-10-17T02:11:48.846Z',
    updatedAt: '2019-10-17T02:11:48.846Z',
  },
]

const students = [
  {
    id: 109,
    firstName: 'Yayoi',
    lastName: 'Kusama',
    email: 'yayoi@gmail.com',
    imageUrl:
      'https://artlogic-res.cloudinary.com/w_2400,h_1800,c_limit,f_auto,fl_lossy,q_auto:good/ws-unitlondon3/usr/images/blog_entries/hero_image/67/kusama-yayoi-_louis-vuitton-shop-window-display-with-tentacles_2012-2015_1500x1386.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:06:14.809Z',
    campusId: null,
  },
  {
    id: 102,
    firstName: 'Louise',
    lastName: 'Nevelson',
    email: 'lnevelson@gmail.com',
    imageUrl:
      'https://d2jv9003bew7ag.cloudfront.net/uploads/Louise-Nevelson-Untitled-c.-late-1970s-detail.jpg',
    gpa: '4',
    createdAt: '2019-10-16T21:10:16.235Z',
    updatedAt: '2019-10-16T21:10:16.235Z',
    campusId: 102,
  },
  {
    id: 112,
    firstName: 'Barbara',
    lastName: 'Kruger',
    email: 'bkruger@gmail.com',
    imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/1/11/Untitled_%28Your_body_is_a_battleground%29.jpg',
    gpa: '4',
    createdAt: '2019-10-16T21:09:33.989Z',
    updatedAt: '2019-10-16T21:09:33.989Z',
    campusId: 102,
  },
  {
    id: 113,
    firstName: 'Cindy',
    lastName: 'Sherman',
    email: 'csherman@gmail.com',
    imageUrl:
      'https://www.bjp-online.com/wp-content/uploads/2019/06/133_21_Untitled-Film-Still-21_CS-21-NEW.jpeg',
    gpa: '4',
    createdAt: '2019-10-16T21:10:16.235Z',
    updatedAt: '2019-10-16T21:10:16.235Z',
    campusId: 102,
  },
  {
    id: 110,
    firstName: 'Jenny',
    lastName: 'Holzer',
    email: 'jholzer@gmail.com',
    imageUrl:
      'https://www.studiointernational.com/image_article.php?image=images/articles/h/091-holzer-jenny-2017/holzer-660-565.jpg',
    gpa: '4',
    createdAt: '2019-10-16T21:10:16.235Z',
    updatedAt: '2019-10-16T21:10:16.235Z',
    campusId: 102,
  },
  {
    id: 111,
    firstName: 'Hannah',
    lastName: 'Wilke',
    email: 'hwilke@gmail.com',
    imageUrl: 'https://miro.medium.com/max/4132/1*wKFxgjX6EMCyy26e1jYekA.jpeg',
    gpa: '4',
    createdAt: '2019-10-16T03:18:31.166Z',
    updatedAt: '2019-10-16T17:36:56.526Z',
    campusId: 102,
  },
  {
    id: 114,
    firstName: 'Louise',
    lastName: 'Lawler',
    email: 'l.lawler@gmail.com',
    imageUrl: 'https://www.tate.org.uk/art/images/work/P/P79/P79772_9.jpg',
    gpa: '4',
    createdAt: '2019-10-16T21:10:16.235Z',
    updatedAt: '2019-10-16T21:10:16.235Z',
    campusId: 102,
  },
  {
    id: 118,
    firstName: 'Max',
    lastName: 'Bittroff',
    email: 'mbit@gmail.com',
    imageUrl:
      'https://cdn.wallpaper.com/main/styles/responsive_920w_scale/s3/frankfurter-telefon-max-bittrof.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:06:14.809Z',
    campusId: 100,
  },
  {
    id: 115,
    firstName: 'A.',
    lastName: 'Schawinsky',
    email: 'asch@gmail.com',
    imageUrl:
      'https://assets.catawiki.nl/assets/2018/11/30/e/1/c/e1c238f6-f4ac-11e8-803f-e1f9a80af0e0.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:34:12.355Z',
    campusId: 100,
  },
  {
    id: 123,
    firstName: 'Walter',
    lastName: 'Gropius',
    email: 'wgropius@gmail.com',
    imageUrl:
      'https://www.irishtimes.com/polopoly_fs/1.3817915.1551973189!/image/image.jpg_gen/derivatives/box_620_330/image.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:34:12.355Z',
    campusId: 100,
  },
  {
    id: 124,
    firstName: 'Mies',
    lastName: 'van der Rohe',
    email: 'mies@gmail.com',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mies_van_der_Rohe_photo_Farnsworth_House_Plano_USA_9.jpg/1280px-Mies_van_der_Rohe_photo_Farnsworth_House_Plano_USA_9.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:34:12.355Z',
    campusId: 100,
  },
  {
    id: 116,
    firstName: 'Peter',
    lastName: 'Murphy',
    email: 'belalugosi@gmail.com',
    imageUrl: 'https://f4.bcbits.com/img/a0519591319_10.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:34:12.355Z',
    campusId: 100,
  },
  {
    id: 117,
    firstName: 'Lina',
    lastName: 'Bo Bardi',
    email: 'lbb@gmail.com',
    imageUrl:
      'https://cdn.wallpaper.com/main/styles/responsive_1460w_scale/s3/_emebed_p_l01_01-2.jpg?itok=5rrpjHHY',
    gpa: '4',
    createdAt: '2019-10-16T16:06:14.809Z',
    updatedAt: '2019-10-16T16:34:12.355Z',
    campusId: 100,
  },
  {
    id: 121,
    firstName: 'Marco',
    lastName: 'Casagrande',
    email: 'm.casagrande1@gmail.com',
    imageUrl:
      'https://i.pinimg.com/originals/41/19/61/411961f0d6aca495aafdd7eb0224515c.jpg',
    gpa: '4',
    createdAt: '2019-10-16T16:07:29.095Z',
    updatedAt: '2019-10-16T19:50:59.079Z',
    campusId: 103,
  },
  {
    id: 125,
    firstName: 'Sarah',
    lastName: 'Charlesworth',
    email: 'scharlesworth@gmail.com',
    imageUrl:
      'https://2l7jmi1c781t2ns2qv1yaid6-wpengine.netdna-ssl.com/wp-content/uploads/2014/08/img-sarah-charlesworth_165012368230-650x430.jpg',
    gpa: '4',
    createdAt: '2019-10-16T21:10:16.235Z',
    updatedAt: '2019-10-16T21:10:16.235Z',
    campusId: 102,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true })

    await Promise.all(
      campuses.map(campus => {
        return Campus.create(campus)
      })
    )

    await Promise.all(
      students.map(student => {
        return Student.create(student)
      })
    )

    console.log(green('Seeding success!'))
    db.close()
  } catch (error) {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(error)
    db.close()
  }
}

seed()
