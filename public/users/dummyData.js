export const users = [
  { userId: "hgfiye598", userName: "user-1" },
  { userId: "cpk392d", userName: "user-2" },
  { userId: "vasger2t2", userName: "user-3" },
  { userId: "cnjwh7", userName: "user-4" },
  { userId: "vnu4h327q", userName: "user-5" },
  { userId: "bkrdj42", userName: "user-6" },
  { userId: "986tcge3", userName: "user-7" },
  { userId: "khu34324", userName: "user-8" },
];

export const allData = [
  {
    id: "23214",
    userName: "user-1",
    userId: "hgfiye598",
    team: ["user-3", "user-4", "user-5", "user-6", "user-7", "user-8"],
    designTeamTasks: [
      {
        taskId: "45u30dsifj",
        task: "Design tasks",
        backLogCards: [
          //  card 1
          {
            user: "hgfiye598",
            cardId: "fdhd56456df",
            title: "Create case study for Edplace",
            date: "Feb 2, 2022",
            priority: "low",
            description: [
              "Prepare the client assets from the latest projects to be uploaded on the website",
              "Make sure to upload all the materials in svg to the Marketing folder on drive",
            ],
            overallProgress: [
              {
                done: true,
                title: "Edplace logo",
              },
              {
                done: false,
                title: "Client Logo svg",
              },
              {
                done: false,
                title: "Prepare color palette",
              },
            ],
            totalComments: 4,
            comments: [
              {
                user: "user-4",
                commentId: "asa332",
                comment:
                  "We might have a problem related to those video contents",
              },
              {
                user: "use-2",
                comment: "I say we should get onto it at earliest",
              },
              {
                user: "user-5",
                commentId: "kluyy7",
                comment:
                  "Guys those header components and assets are complete.",
              },
              {
                user: "user-7",
                commentId: "sggr65",
                comment: "I'm on it.",
              },
            ],
          },
          // card 2
          {
            user: "hgfiye598",
            cardId: "dfg568j443",
            title: "Update assets on Halcyon Mobile website",
            priority: "medium",
            description: [
              "Prepare the client assets from the latest projects to be uploaded on the website",
              "Make sure to upload all the materials in svg to the Marketing folder on drive",
            ],
            overallProgress: [
              {
                done: true,
                title: "Edplace logo",
              },
              {
                done: false,
                title: "Roadz logo",
              },
              {
                done: false,
                title: "Roadz Header Image",
              },
              {
                done: false,
                title: "Roadz Client Photo",
              },
            ],
          },
        ],

        todoCards: [
          // card 1
          {
            user: "hgfiye598",
            cardId: "65fgbcxe4",
            title: "Update design team video with new company logo",
            priority: "medium",
            description: [
              "Prepare the video in mp4 and dont forget to compress it before merging it into the project",
              "Make sure the the video is atleast 1 minute and 30 secs long. It is a must",
            ],
            overallProgress: [
              {
                done: false,
                title: "HD Soundtracks",
              },
              {
                done: true,
                title: "Artworks for video",
              },
              {
                done: false,
                title: "Record",
              },
            ],
          },
          // card 2
          {
            user: "hgfiye598",
            cardId: "sd78765jf",
            title: "Prepare task template",
            priority: "high",
            description: [
              "Need a template as soon as possible as per the request from  the developer team and needs to be looked after it at highest priority",
              "Developer team needs the proper templates for every components.",
            ],
            overallProgress: [
              {
                done: true,
                title: "High res asssets",
              },
              {
                done: true,
                title: "Artworks",
              },
              {
                done: false,
                title: "Templates approval",
              },
            ],
            totalComments: 2,
            comments: [
              {
                user: "user-4",
                commentId: "wau38u",
                comment:
                  "We might have a problem related to those video contents",
              },
              {
                user: "use-2",
                commentId: "78ihbdxde",
                comment: "I say we should get onto it at earliest",
              },
            ],
          },
          // card 3
          {
            user: "hgfiye598",
            cardId: "7txf3767j",
            title: "Gather resources for Pitch deck",
            date: "Feb 2, 2022",
            priority: "low",
            description: [
              "Checkout for the 3rd party libraries that are free for use and paid ones are only allowed that arent already too popular.",
              "We do have a list of libraries in the csv file already, so do check them out too.",
              "Also dont forget to update the csv with those sources.",
            ],
            overallProgress: [
              {
                done: true,
                title: "Requirement Gathering",
              },
              {
                done: true,
                title: "CSV updated",
              },
              {
                done: false,
                title: "Approval",
              },
            ],
            totalComments: 3,
            comments: [
              {
                user: "user-4",
                commentId: "ijoh76g7",
                comment:
                  "We might have a problem related to those video contents",
              },
              {
                user: "use-2",
                commentId: "f754e43k",
                comment: "I say we should get onto it at earliest",
              },
            ],
          },
          // card 4
          {
            user: "hgfiye598",
            cardId: "w3ji76rgcg",
            title: "Send over website assets to developers",
            priority: "medium",
            description: [
              "Gather all the resources and assets and generate the drive link for it and get approved from the admin too before sending them over",
            ],
            overallProgress: [
              {
                done: true,
                title: "Drive link",
              },
              {
                done: false,
                title: "Ping admin",
              },
              {
                done: false,
                title: "Approval",
              },
              {
                done: false,
                title: "Sent",
              },
            ],
          },
        ],
        inProgressCards: [
          // card 1
          {
            user: "hgfiye598",
            cardId: "078ihukhod",
            title: "Mentoring 2022",
            priority: "high",
            description: [
              "Mentor all the new joiners with the basic tasks and protocols to get familiar with the process around here",
              "Keep the Manager updated as the utmost priority",
              "Stay in touch with the HR team for any further details",
            ],
            overallProgress: [
              {
                done: true,
                title: "Asset Gathering",
              },
              {
                done: false,
                title: "Client interactions",
              },
              {
                done: false,
                title: "Reporting",
              },
            ],
            totalComments: 2,
            comments: [
              {
                user: "user-4",
                commentId: "r656d2a3",
                comment:
                  "We might have a problem related to those video contents",
              },
              {
                user: "use-2",
                commentId: "i23syw3w3",
                comment: "I say we should get onto it at earliest",
              },
            ],
          },
        ],
        doneCards: [
          //  card 1
          {
            user: "hgfiye598",
            cardId: "237as8d0",
            title: "Case study for Roadz",
            date: "Jan 12, 2022",
            priority: "low",
            description: [
              "Roadz is a new client so we will need an extensive research work prior to the beginning of the case study.",
              "Client requirements are available at the drive link",
            ],
            overallProgress: [
              {
                done: true,
                title: "Requirements",
              },
              {
                done: true,
                title: "Survey",
              },
              {
                done: true,
                title: "Reports",
              },
            ],
            totalComments: 4,
            comments: [
              {
                user: "user-4",
                commentId: "fbccftr",
                comment:
                  "We might have a problem related to those video contents",
              },
              {
                user: "use-2",
                comment: "I say we should get onto it at earliest",
              },
              {
                user: "user-5",
                commentId: "32o97fz",
                comment:
                  "Guys those header components and assets are complete.",
              },
              {
                user: "user-7",
                commentId: "sggr65",
                comment: "I'm on it.",
              },
            ],
          },
          // card 2
          {
            user: "hgfiye598",
            cardId: "kuy59r8rd",
            title: "Design system verification",
            priority: "medium",
            description: [
              "Design system that was prepared last month needs to be verified from the client and the external as well",
              "Create a short presentation as well with the reports",
            ],
            overallProgress: [
              {
                done: true,
                title: "Testing",
              },
              {
                done: true,
                title: "Reports",
              },
              {
                done: true,
                title: "Presentation",
              },
            ],
          },
        ],
      },
      {
        taskId: "6e09xxe",
        task: "Halcyon website",
        backLogCards: [],
        todoCards: [],
        inProgressCards: [],
        doneCards: [],
      },
      {
        taskId: "23efsdfsew",
        task: "Onboarding Materials",
        backLogCards: [],
        todoCards: [],
        inProgressCards: [],
        doneCards: [],
      },
      {
        taskId: "9090fggd4",
        task: "Marketing",
        backLogCards: [],
        todoCards: [],
        inProgressCards: [],
        doneCards: [],
      },
    ],
    personalTasks: [
      {
        taskId: "568asd90h",
        task: "Home renovations",
        backLogCards: [],
        todoCards: [],
        inProgressCards: [],
        doneCards: [],
      },
      {
        taskId: "3y457eyd",
        task: "Untitled",
        backLogCards: [],
        todoCards: [],
        inProgressCards: [],
        doneCards: [],
      },
    ],
  },
];
