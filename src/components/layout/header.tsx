import { LocationBar } from "../shared/location"

const HEADER_HEIGHT = "48px"

function Header() {
  return (
    <div style={{"--header-height": HEADER_HEIGHT} as React.CSSProperties} className="h-(--header-height)">
      <header className="fixed px-3 bg-secondary h-(--header-height) w-full">
        <div className="flex h-9 items-center justify-between">
          <LocationBar />
          {/* <div>Apple Orange</div>
          <div>+36707800974</div> */}
        </div>
        <div></div>
      </header>
    </div>
  )
}

export { Header }
