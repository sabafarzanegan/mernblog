import React from "react";
import { TextInput, Select, FileInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreatePost() {
  return (
    <>
      <h1 className="font-vazir text-xl text-center mt-4">ساختن بلاگ</h1>
      <form
        action=""
        className="flex flex-col gap-y-4  min-h-screen m-auto mt-2 font-vazir p-5">
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row w-full">
          <TextInput
            id="small"
            type="text"
            sizing="md"
            className="md:w-[49%] w-full"
            placeholder="عنوان مقاله"
          />
          <div className="md:w-[50%] w-full">
            <Select id="blogs" className="px-2">
              <option value="uncategorized">انتخاب دسته بندی</option>
              <option value="javascript">جاوااسکریپت</option>
              <option value="nextjs">نکست</option>
              <option value="reactjs">ریکت</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-1 items-center justify-between p-4 border-4 border-dashed border-blue-500">
          <FileInput id="file" />
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            size="sm"
            className="font-vazir">
            آپلود عکس
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="بنویسید" className="h-72 mb-12" />
        <Button gradientDuoTone="redToYellow" className="font-vazir text-lg">
          انتشار
        </Button>
      </form>
    </>
  );
}

export default CreatePost;
