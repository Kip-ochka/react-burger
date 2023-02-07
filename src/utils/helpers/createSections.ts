import { Ingridient } from '../../types/ingridient'

export const createSections = (
  arr: { name: string; type: string }[],
  items: Ingridient[]
) => {
  const sections = arr.map((sectionName) => {
    return {
      name: sectionName.name,
      type: sectionName.type,
      items: items.filter((ingdidientItem) => {
        return sectionName.type === ingdidientItem.type
      }),
    }
  })
  return sections
}
