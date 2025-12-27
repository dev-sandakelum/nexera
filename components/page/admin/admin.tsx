import React from 'react'

export default function Admin() {
  return (
    <div>{`n Next.js <Link> (from next/link), you cannot directly add target="_blank" to the <Link> component. Instead, you need to wrap an <a> tag inside <Link> and put the target and rel attributes on the <a>. Like this:

import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";

<Link href={social.url ? social.url : "#"} key={social.id} passHref>
  <a target="_blank" rel="noopener noreferrer">
    <BsLinkedin />
  </a>
</Link>


✅ Notes:

target="_blank" opens the link in a new tab.

rel="noopener noreferrer" is important for security when using _blank.

passHref ensures the <a> receives the href from <Link>.`}</div>
  )
}
