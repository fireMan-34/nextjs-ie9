import Image from 'next/image';

import JPG from 'public/images/1.jpg';

export default function ImagePage() {
  return <main>
    <h2>Image Page</h2>
    <Image 
      src={JPG}
      alt='this is a image'
    />
    <Image 
      src="/images/1.jpg"
      alt='this is static image'
      width={96}
      height={96}
    />
  </main>
}