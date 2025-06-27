import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../UI/Select";

const SavedStartUp = () => {
  return (

    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saved Startups</h1>
        <p className="text-gray-600">Your handpicked collection of promising startups</p>
      </div>
      <Select defaultValue="recent">
        <SelectTrigger className="w-40 border-gray-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="domain">By Domain</SelectItem>
          <SelectItem value="stage">By Stage</SelectItem>
          <SelectItem value="name">By Name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SavedStartUp;