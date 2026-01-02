import Image from 'next/image';

interface Author {
  name: string;
  photo_url: string | null;
  location: string | null;
}

interface AuthorInfoProps {
  author: Author;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => {
  if (!author) {
    return null;
  }

  return (
    <div className="flex items-center mt-4 mb-8">
      {author.photo_url && (
        <Image
          src={author.photo_url}
          alt={author.name}
          width={48}
          height={48}
          className="rounded-full mr-4"
          loading="lazy"
        />
      )}
      <div>
        <p className="font-semibold text-lg">{author.name}</p>
        {author.location && (
          <p className="text-gray-500 text-sm">{author.location}</p>
        )}
      </div>
    </div>
  );
};

export default AuthorInfo;
