import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      offColor: string
      spheres: string
      accent: string
    },
    backgrounds: {
      primary: string
      secondary: string
      offColor: string
      accent: string
    }
    
  }
}