// async getCommentWithReplies(commentId: string): Promise<CommentDocument> {
//     try {
//       const comment = await this.commentModel
//         .findById(commentId)
//         .populate({
//           path: 'userId',
//           select: 'name avatar rating',
//         })
//         .exec();
//       if (!comment){
//         throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
//       };
//       async function fetchReplies(comment: CommentDocument, commentModel: any): Promise<CommentDocument> {
//         if (!comment.replies || comment.replies.length === 0) return comment;
//         const replies = await commentModel.find({ '_id': { $in: comment.replies } })
//           .populate({
//             path: 'userId',
//             select: 'name avatar rating',
//           })
//           .exec();

//         comment.replies = await Promise.all(replies.map(async reply => {
//           reply = await fetchReplies(reply, commentModel);
//           return reply;
//         }));
//         return comment;
//       }
//       return fetchReplies(comment, this.commentModel);
//     } catch (error) {
//       console.error('Error fetching comment with replies:', error);
//       throw new Error('Failed to fetch comment with replies');
//     }
//   }
