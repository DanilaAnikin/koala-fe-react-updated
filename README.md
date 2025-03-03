# Koala42 Assessment - Frontend

### Description
1) In this project I'm using NextJS and Tailwind CSS
2) I'm using TypeScript and types are in /app/types.ts
3) Main code is in app/components/HierarchyTable.tsx

### Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/DanilaAnikin/koala42-assessment-frontend.git
cd koala42-assessment-frontend
npm install
```

Running:
```bash
npm run dev
```

### Issues and posible improvements
#### Responsive styles
I could add styles so the table is responsive and looks good either on mobile.

#### Split code into multiple components
If the project was bigger, I would separate the HierarchyTable and HierarchyRow components so it looks better and is easier to read.

#### Connecting with BE
Of course I could connect this code with my BE, already created code ( at github.com/DanilaAnikin/koala42-assessment-hiring/ )

#### Separate functions
I could also move functions away from .tsx files to one .ts file and importing them from there.

#### Headers mapping if
There is one bad looking code in /app/components/HierarchyTable.tsx, where I am looking for specific header. Instead of that I could better do it in JavaScript and return the data separately

#### Style and design
If I spend more time on that, I could manage the design and correct my styles so it looks better. 
In the assessment was that I don't have to spend much time on that, so I didn't.
